import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import ReactWordcloud from 'react-wordcloud';

const WordCloud = (props) => {

    const [submissions, setSubmissions] = useState('');
    const [tempCleanArray, setTempCleanArray] = useState([]);
    const [cleanText, setCleanText] = useState('');
    const [wordsArray, setWordsArray] = useState([]);

    const stopwords = ['would','i', 'me', 'my', 'myself', 'we', 'we\'re', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now'];

    //Clean stop words and punctuation
    //create words array for word cloud
    const removeStopwords = (str) => {
        const regex = /[!"'#$%&'()*+,-./:;<=>?@[\]^_`{|}~123456789]/g;
        str = str.replace(regex, '');
        str = str.toString().toLowerCase();
        const words = str.split(' ');
        setTempCleanArray([]);
        for (var i = 0; i < words.length; i++) {
            const word_clean = words[i];
            if (!stopwords.includes(word_clean)) {
                setTempCleanArray(tempCleanArray => [...tempCleanArray, word_clean]);
            }
        }
        setCleanText(tempCleanArray.join(' '));
        const map = tempCleanArray.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1) , new Map());
        const arr = [...map].map(([text, value]) => ({ text, value}))
        setWordsArray(arr);
    }
    
    useEffect(() => {
        setSubmissions(props.data);
        console.log(props.data);
        removeStopwords(submissions);
    }, [props.data]);

    useEffect(() => {
        console.log(cleanText)
    }, [submissions]);
    

    return (
        <div>
            {/*<a>{cleanText}</a> */}
            <ReactWordcloud words={wordsArray}/>
        </div>
    );
}

export default WordCloud;