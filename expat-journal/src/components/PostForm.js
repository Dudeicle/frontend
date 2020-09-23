import React, {useState, useEffect} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import * as yup from "yup"
import schema from "../formSchemas/postFormSchema"
import axios from "axios"
import Dashboard from './Dashboard';
import DashboardCard from './DashboardCard';

const initialFormValues = {
  name: "",
  title: "",
  location: "",
  date: "",
  notes: "",
  rating: "",
  viewable: false
}

const initialFormErrors = {
  name: "",
  title: "",
}

const initialDisabled = true

const PostForm = (props) => {
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)
  const [post, setPost] = useState([])

  const validate = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then((valid)=>{
        setFormErrors({
          ...formErrors, [name]: "",
        })
      })
      .catch((err)=>{
        setFormErrors({
          ...formErrors, [name]: err.errors[0]
        })
      })
  }

  const changeHandler = ((event) => {
    const { name, value, type, checked } = event.target
    validate(name, value)
    const valueToUse = type === "checkbox"? checked : value
    setFormValues({...formValues, [name]: valueToUse})
    console.log(name, valueToUse)
  })

  const submitHandler = ((event)=>{
      event.preventDefault();
      const newPost = {
        name: formValues.name.trim(),
        title: formValues.title.trim(),
        location: formValues.location.trim(),
        date: formValues.date.trim(),
        notes: formValues.notes.trim(),
        rating: formValues.rating,
        viewable: formValues.viewable
      }
      axios 
        .post()
        .then()
        .catch()
  })

  useEffect(()=>{
    schema.isValid(formValues)
      .then(valid => {
        setDisabled(!valid)
      })
  }, [formValues])

  return (
   <>
      <h2>Add a new entry:</h2>

      <div>
        <div>{formErrors.name}</div>
        <div>{formErrors.title}</div>
      </div>

      <Form onSubmit={submitHandler}>
       <FormGroup>
          <Label for="name">Name: </Label>
          <Input type="text" name="name" id="name" placeholder="enter your name" onChange={changeHandler}/>
        </FormGroup>
        <FormGroup>
          <Label for="title">Tagline: </Label>
          <Input type="text" name="title" id="title" placeholder="enter your post title" onChange={changeHandler}/>
        </FormGroup>
        <FormGroup>
          <Label for="location">Location: </Label>
          <Input type="text" name="location" id="location" placeholder="enter your post location" onChange={changeHandler}/>
        </FormGroup>
        <FormGroup>
          <Label for="date">Date: </Label>
          <Input type="text" name="date" id="date" placeholder="enter the date of your visit" onChange={changeHandler}/>
        </FormGroup>
        {/* <FormGroup>
          <Label for="exampleSelect">Select</Label>
          <Input type="select" name="select" id="exampleSelect">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </FormGroup> */}
        <FormGroup>
          <Label for="notes">Post notes: </Label>
          <Input type="notes" name="notes" id="notes" onChange={changeHandler}/>
        </FormGroup>
        <FormGroup tag="fieldset">
          <legend>rating</legend>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="rating" value="5" onChange={changeHandler}/>{' '}
              *****
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="rating" value="4" onChange={changeHandler}/>{' '}
              ****
            </Label>
          </FormGroup>
          <FormGroup check disabled>
            <Label check>
              <Input type="radio" name="rating" value="3" onChange={changeHandler}/>{' '}
              ***
            </Label>
          </FormGroup>
          <FormGroup check disabled>
            <Label check>
              <Input type="radio" name="rating" value="2" onChange={changeHandler}/>{' '}
              **
            </Label>
          </FormGroup>
          <FormGroup check disabled>
            <Label check>
              <Input type="radio" name="rating" value="1" onChange={changeHandler}/>{' '}
              *
            </Label>
          </FormGroup>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input name="viewable" type="checkbox" onChange={changeHandler}/>{' '}
            Make Post Private
          </Label>
        </FormGroup>
        <Button disabled={disabled}>Submit</Button>
      </Form>

      <DashboardCard post={post}/>
   </>
   
  );
}
export default PostForm;