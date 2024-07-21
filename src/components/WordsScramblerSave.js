import React from 'react'
import { useState } from "react";
import { Reorder } from "framer-motion"
import SubmitButton from './SubmitButton';
import { useSelector } from 'react-redux';

const LI = {
  text: 'black',
  background: 'white',
  primary: 'rebeccapurple',
};

function WordsScramblerSave({question, setUserAnswer}) {
  const livequizflag = useSelector((state) => state.livequizflag.value)
const handleClick = () => {
  const uanswer = document.getElementsByClassName('word_scrambler_items')
  //console.log("BBBBBBBBBBBBBBBBBBBBBBBBB")
  var temp_arr = []
  for (let i = 0; i < uanswer.length; i++) {
    var word = uanswer[i].innerHTML
    //console.log("QQQQQQQQQQQQQQQQQQQQQQQ")
    //console.log("IIIIIIIIIII"+mvalue)
    temp_arr.push(word)
  }
  //user_answer = temp_arr.join('/')
  setUserAnswer(temp_arr.join('/'))
  //console.log("QQQQQQQQQQQQ",user_answer)
}
 
    var marray = question.content.split('/')
    shuffle(marray)
    var listItems = []
    marray.forEach( (element, index) => {
        listItems.push({name: element, id: index})
    });

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]];
      }
    }   

    const [items, setItems] = useState(listItems);

    const itemStyleBig =  {
      borderRadius: "5px",
      marginBottom: "5px",
      marginLeft: "10px",
      fontSize: "25px",
      fontWeight: "bold",
      color: "yellow", 
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      padding: "2px 12px 5px 12px",
      background: "#b04381"
  }

    const itemStyle =  {
      borderRadius: "5px",
      marginBottom: "5px",
      marginLeft: "10px",
      
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      padding: "10px 10px 10px 10px",
      background: "cyan"
  }
  
    if (question.words_scramble_direction === 'x') {
      return (
        <>
        <Reorder.Group axis = 'x' 
          values={items} 
          onReorder={setItems} 
          style={{display:"flex", flexDirection:"row"}}
          >
          {items.map((item) => (
            // Change the li to Reorder.Item and add value prop
            <Reorder.Item className="word_scrambler_items" style={ itemStyleBig}  key={item.id} value={item}>
              {item.name}
            </Reorder.Item>
          ))}
        </Reorder.Group>
        <div style={{width:"60px"}}>
      
            <SubmitButton handleClick={handleClick} />
        
      
         </div>
    
        </>
      );
    }
    else {
      return (
        <>
        <Reorder.Group axis = 'y' 
          values={items} 
          onReorder={setItems} 
          >
          {items.map((item) => (
            // Change the li to Reorder.Item and add value prop
            <Reorder.Item className="word_scrambler_items" style={ itemStyle}  key={item.id} value={item}>
              {item.name}
            </Reorder.Item>
          ))}
        </Reorder.Group>
        <div style={{width:"60px"}}>
        
            <SubmitButton handleClick={handleClick} />
        
        
       </div>
    
        </>
      );
    }
   
}

export default WordsScrambler