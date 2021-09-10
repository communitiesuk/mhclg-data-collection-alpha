module.exports = function (env) {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  var filters = {}

  filters.unused = function(columns, thisColumn, columnMapping){
    if (! columnMapping) return columns
    if (! columns) return []
    const out = columns.filter(col => !Object.values(columnMapping).includes(col))
    if (columnMapping[thisColumn]) out.unshift(columnMapping[thisColumn])
    out.push("<No mapping>")
    return out
  }

  filters.includes = function(hay,needle) {
    if(!hay) return false
    return hay.includes(needle)
  }
  /* ------------------------------------------------------------------
    add your methods to the filters obj below this comment block:
    @example:

    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    Which in your templates would be used as:

    {{ 'Paul' | sayHi }} => 'Hi Paul'

    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.

    Filters can take additional arguments, for example:

    filters.sayHi = function(name,tone) {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!'
    }

    Which would be used like this:

    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'

    For more on filters and how to write them see the Nunjucks
    documentation.

  ------------------------------------------------------------------ */

  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */

  filters.trim_end = function(str, char) {
    const re = new RegExp(`${char}$`)
    return str.replace(re, '')
  }

  filters.dateFormat = function(str) {
    date = new Date(str);
    return date.toLocaleDateString('en-gb', {day: 'numeric', month: 'short', year: 'numeric'});
  }

  return filters
}
