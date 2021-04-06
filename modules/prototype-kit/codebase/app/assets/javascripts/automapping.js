function matchDataColumns(ours, theirs){
  // Match on most words in common.
  const automapping = {}

  $.each(ours, function(i, column){
    let mostInCommon = getMostWordsInCommon(column, theirs);
    automapping[column] = mostInCommon;
  })

  return automapping;
}

function getMostWordsInCommon(column, columnsToMatch){
  let wordsInCommonCounts = {};
  let wordsInColumn = columnToWords(column);

  $.each(columnsToMatch, function(i, columnName){
    let words = columnToWords(columnName);
    words.forEach(function(word){
      if (wordsInColumn.includes(word)){
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
  let out = Array.from(new Set(column.replace(/\W+/, " ").split(" ")));
  return out.filter(function(word){ return word.length > 2});
}

function increment(item, dictionary){
  if (! (item in dictionary)){
    dictionary[item] = 0;
  }

  dictionary[item]++;
}

function append(column, item, dictionary){
  if (! (item in dictionary)){
    dictionary[column] = [];
  }

  dictionary[column].push(item);
}

function findBestMatches(){
  return matchDataColumns(ourColumns, theirColumns);
}

function orderedBestMatches(){
  return matchDataColumns(ourColumns, theirColumns);
}

// console.log(bestMatches)
