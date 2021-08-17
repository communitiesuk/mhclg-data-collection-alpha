import pandas
import sys
from user_agents import parse

file = sys.argv[1]
logs = pandas.read_csv(file)
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

user_agents.drop(user_agents[user_agents['browser'] == 'Googlebot'].index, inplace=True)
user_agents.drop(user_agents[user_agents['browser'] == 'DuckDuckGo-Favicons-Bot'].index, inplace=True)

grouped = user_agents.groupby(['device', 'os', 'browser'])['count'].sum().sort_values(ascending=False)
print(grouped)

import psutil
memory = psutil.virtual_memory()
print(f" {'*' * 3} Memory used percentage - {memory.percent} \n {'*' * 4} Free Memory available - { round(memory.free / (1024.0 ** 3))} GB")

print(f" ** Memory usage of the file - {sum(logs.memory_usage()) * 0.000001} MB for {len(logs.index)} Rows")
