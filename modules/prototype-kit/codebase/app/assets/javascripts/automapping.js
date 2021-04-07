function matchDataColumns(ours, theirs){
  // Match on most words in common.
  const automapping = {}

  $.each(ours, function(i, column){
    let mostInCommon = getMostWordsInCommon(column, theirs);
    automapping[column] = mostInCommon;
  })

  console.log(automapping["Type of tenancy"])

  return automapping;
}

function getMostWordsInCommon(column, columnsToMatch){
  let wordsInCommonCounts = {};
  let wordsInColumn = columnToWords(column);
  if (column == "Type of tenancy"){
    console.log(wordsInColumn)
  }

  $.each(columnsToMatch, function(i, columnName){
    let words = columnToWords(columnName);
    if (column == "Type of tenancy"){
      console.log(words)
    }
    words.forEach(function(word){
      if (wordsInColumn.includes(word)){
        if (column == "Type of tenancy"){
          console.log("Appending "+word)
        }
        append(columnName, word, wordsInCommonCounts)
      }
    })
  });

  return wordsInCommonCounts;
}

function columnToWords(column){
  // let document = nlp(column);
  // let normalizedWords = document.normalize({plurals: true, whitespace: true, case: true, punctuation: true, unicode: true, contractions: true, acronyms: true, possessives: true, plurals: true, verbs: true, honorifics: true});
  // let normalizedNounsAndVerbs = normalizedWords.match("(#Noun|#Verb)");
  // return document.out("array");
  let out = Array.from(new Set(column.toLowerCase().replaceAll(/[^a-z]+/g, " ").split(" ")));
  return out.filter(function(word){ return word.length > 2});
}

function append(column, item, dictionary){
  if (! (column in dictionary)){
    dictionary[column] = [];
  }

  dictionary[column].push(item);
}

function findBestMatches(){
  return matchDataColumns(ourColumns, theirColumns);
}

function orderedMatches(){
  let matchedData = findBestMatches()
  console.log(matchedData)
  let out = {}

  $.each(Object.keys(matchedData), function(i, key){
    out[key] = Object.keys(matchedData[key])
      .map(k => [k, matchedData[key][k].length])
    out[key].sort((a, b) => b[1] - a[1])
    out[key] = out[key].map(columnWithCount => columnWithCount[0])
  })

  return out
}
