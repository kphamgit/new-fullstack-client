import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
//import { setAnswer } from "../../redux/answer";
import Button from "react-bootstrap/Button"
import Form from 'react-bootstrap/Form';
import SubmitButton from "./SubmitButton";
//import LiveSubmitButton from "./LiveSubmitButton";

export const Radio = ({question, setUserAnswer, live_flag}) => {
  const [selectedItem, setSelectedItem] = useState(null)
  const livequizflag = useSelector((state) => state.livequizflag.value)

  const onOptionChange = (e) => {
    //console.log("XXXXXXXXXXXXXXXXXX"+e.target.value)
    //dispatch(setAnswer(e.target.value))
    setSelectedItem(e.target.value)
  }

  const handleClick = () => {
      setUserAnswer(selectedItem)
  }
  
  return (
    <>
    <div>{question.content}</div>
    <br />
    <Form>
      {['radio'].map((type) => (
        <div key={`${type}`} className="mb-3">
          <Form.Check
            label={question.radio.choice_1_text}
            name="radio"
            value="choice1"
            type={type}
            id={`${type}_choice_1`}
            onChange={onOptionChange}
          />
          <Form.Check
            label={question.radio.choice_2_text}
            name="radio"
            value="choice2"
            type={type}
            id={`${type}_choice_2`}
            onChange={onOptionChange}
          />
            <Form.Check
            label={question.radio.choice_3_text}
            name="radio"
            value="choice3"
            type={type}
            id={`${type}_choice_3`}
            onChange={onOptionChange}
          />
          {question.radio.choice_4_text && (
          <Form.Check
            label={question.radio.choice_4_text}
            name="radio"
            value="choice4"
            type={type}
            id={`${type}_choice_4`}
            onChange={onOptionChange}
          />
          )}
        </div>
      ))}
    </Form>
    <div>&nbsp;</div>
    <div style={{width:"60px"}}>
            <SubmitButton handleClick={handleClick} />
    </div>
    </>
  );
};