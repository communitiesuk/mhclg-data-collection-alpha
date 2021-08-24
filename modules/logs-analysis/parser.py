import os
import glob
import pandas
import sys
from user_agents import parse

colnames = ['Date Time', 'Time Zone', 'Connection From', 'col3', 'col4', 'Action',
            'Size', 'Request', 'Response', 'URL Requested', 'Connection from what OS/Software',
            'Public IP address', 'Cloudfront ID', 'rec']

dir = sys.argv[1]
os.chdir(dir)

extension = 'csv'
all_filenames = [i for i in glob.glob('*.{}'.format(extension))]
for file in all_filenames:
    logs = pandas.read_csv(file, names=colnames, header=None)
    ua_column = 'Connection from what OS/Software'
    user_agents = logs[ua_column].value_counts()
    user_agents = user_agents.to_frame(name='count').reset_index().rename(columns = {'index':'user-agent'})

    oses = []
    browsers = []
    parsed_user_agents = []
    devices = []
    for ua_string in user_agents['user-agent']:
        user_agent = parse(ua_string)
        parsed_user_agents.append(str(user_agent))
        oses.append(user_agent.os.family + " " + user_agent.os.version_string)
        browsers.append(user_agent.browser.family)
        if user_agent.is_pc:
            device = 'PC'
        elif user_agent.is_mobile:
            device = 'Mobile'
        elif user_agent.is_tablet:
            device = 'Tablet'
        else:
            device = 'Other'
        devices.append(device)

    user_agents['parsed'] = pandas.Series(parsed_user_agents)
    user_agents['device'] = pandas.Series(devices)
    user_agents['os'] = pandas.Series(oses)
    user_agents['browser'] = pandas.Series(browsers)

    user_agents.to_csv('../combined.csv', mode='a', header=False)

file = '../combined.csv'
colnames = ['idx', 'user-agent', 'count', 'parsed', 'device', 'os', 'browser', 'rec']
user_agents = pandas.read_csv(file, names=colnames, header=None, index_col=0)

excluded_agents = ['Googlebot', 'DuckDuckGo-Favicons-Bot', 'Magus Bot', 'bingbot',
                    'HeadlessChrome', 'DotBot', 'Nimbostratus-Bot', 'SEMrushBot',
                    'GooglePlusBot', 'SiteAuditBot', 'MojeekBot', 'BaiduSpider',
                    'SiteCheck-sitecrawl', 'DataForSeoBot', 'serpstatbot', 'oBot',
                    'crawler', 'webprosbot', 'Amazonbot', 'digitalshadowsbot',
                    'MJ12bot', 'SemrushBot', 'MauiBot', 'WebPageTest.org bot', 'Slackbot',
                    'spider', 'Applebot', 'Googlebot-Image', 'okhttp', 'BingPreview',
                    'Slack-ImgProxy', 'FacebookBot', 'Mediapartners-Google',
                    'Python Requests', 'Python-urllib', 'Slackbot-LinkExpanding', 'BLEXBot']
user_agents.drop(user_agents[user_agents['browser'].isin(excluded_agents)].index, inplace=True)
user_agents.drop(user_agents[(user_agents['browser'] == 'Other') & (user_agents['os'] == 'Other ') & (user_agents['device'] == 'Other')].index, inplace=True)

grouped = user_agents.groupby(['device', 'os', 'browser'])['count'].sum().sort_values(ascending=False)
total = grouped.sum()
percentage = grouped / total * 100
percentage.to_csv('../grouped-percentage.csv')

device_grouped = user_agents.groupby(['device'])['count'].sum().sort_values(ascending=False)
device_total = device_grouped.sum()
device_percentage = device_grouped / device_total * 100
device_percentage.to_csv('../device-percentage.csv')


with pandas.option_context('display.max_rows', None):
    print(percentage)
