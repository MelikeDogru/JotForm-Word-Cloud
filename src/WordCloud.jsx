import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import { Button, Container, Row, Col, Form, ListGroup, Card } from 'react-bootstrap';
import Header from './components/Header';
import ReactWordcloud from 'react-wordcloud';

const WordCloud = (props) => {

    const [submissions, setSubmissions] = useState('');
    const [tempCleanArray, setTempCleanArray] = useState([]);
    const [cleanText, setCleanText] = useState('');

    const stopwords = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now'];

    //Clean stop words
    const removeStopwords = (str) => {
        const words = str.split(' ');
        console.log(words);
        setTempCleanArray([]);
        for (var i = 0; i < words.length; i++) {
            const word_clean = words[i];
            if (!stopwords.includes(word_clean)) {
                setTempCleanArray(tempCleanArray => [...tempCleanArray, word_clean]);
            }
        }
        setCleanText(tempCleanArray.join(' '));
        console.log(str);
        console.log("remove");
    }

    //Remove punctuation
    const removePunctuation = (str) => {
        const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
        const result = str.replace(regex, '');
        console.log(result);
        setCleanText(result);
    }
    
    useEffect(() => {
        setSubmissions(props.data);
        console.log(props.data);
        removeStopwords(submissions);
        //removePunctuation(cleanText);
    }, [props.data]);

    useEffect(() => {
        //console.log(submissions);
        console.log(cleanText)
    }, [submissions]);
    

    return (
        <div>
            <a>{cleanText}</a>
        </div>
    );
}

export default WordCloud;