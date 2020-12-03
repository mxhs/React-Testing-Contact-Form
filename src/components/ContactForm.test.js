import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm'

test('renders without errors', () =>{
    render(<ContactForm />)
})

test('user can fill out and submit form', async () =>{
    //Arrange
    render(<ContactForm />)

    //Act: Execute
    const firstNameInput = screen.getByLabelText(/First Name*/i)
    const lastNameInput = screen.getByLabelText(/Last Name*/i)
    const emailInput = screen.getByLabelText(/Email*/i)
    const messageInput = screen.getByLabelText(/Message/i)

    userEvent.type(firstNameInput, "Maxwell")
    userEvent.type(lastNameInput, "Stofman")
    userEvent.type(emailInput, "maxwellstofman@gmail.com")
    userEvent.type(messageInput, "This is the form")

    const button = screen.getByRole("button")
    userEvent.click(button)

    //Assert: 
    const firstNameRender = await screen.findByText(/firstName": "Maxwell"/)
    const lastNameRender =  screen.queryByText(/lastName":/)
    const emailRender = screen.queryByText(/email":/i)
    const messageRender = screen.queryByText(/this is the form/i)
    
    expect(firstNameRender).toBeInTheDocument()
    expect(lastNameRender).toBeInTheDocument()
    expect(emailRender).toBeInTheDocument()
    expect(messageRender).toBeInTheDocument()
})
