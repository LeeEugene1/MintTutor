"use client"

import React,{useEffect, useState} from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator} from '@chatscope/chat-ui-kit-react'

export default function page() {
    const [typing, setTyping] = useState(false)
    const [messages, setMessages] = useState([
        {
            message: "Hello, How are you!",
            sender:"ChatGPT"
        }
    ])
    // const API_KEY = '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'
    // const API_KEY = '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'//test
    const API_KEY = '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'//test

    useEffect(()=>{
        console.log(messages)
    },messages)

    const handleSend = async (message) => {
        const MsgOption = {
            message: message,
            sender: 'user',
            direction:'outgoing'
        }

        const newMessages = [...messages, MsgOption]//prev + new msg

        //update our message state
        setMessages(newMessages)
        setTyping(true)

        //send msg to Chatgpt
        processMsgToChatGPT(newMessages)
    }

    const processMsgToChatGPT = async (chatMessages) => {
        // {sender:"user" or "ChatGPT", message:"The message content here"}
        // apiMessages {role:"user" or "assistant", content:"The message content here"}
        debugger;
        let apiMessages = chatMessages.map((messageObj)=>{
            let role = ''
            if(messageObj.sender === 'ChatGPT'){
                role="assistant"
            }else{
                role="user"
            }
            return {role:role, content: messageObj.message}
        })

        const level = ['beginner, Independent User, Proficient User']

        const systemMessage = {
            role:"system",
            content:`Explain all conceopts like I am an English ${level[0]}.`//speak like 
        }

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages":[
                systemMessage,
                ...apiMessages
            ]
        }

        // await fetch('/cat',{
        //     method:'GET'
        // })
        // .then(e => e.json())
        // .then(result => {
        //     console.log(result)
        // })

        await fetch("https://api.openai.com/v1/chat/completions", {//https://api.openai.com/vi/chat/completions
            method:'POST',
            headers:{
                "Authorization":"Bearer " + API_KEY,
                'Content-Type':"application/json"
            },
            body: JSON.stringify(apiRequestBody)
        })
        .then(e => e.json())
        .then(data=>{
            console.log(data.choices[0].message.content)
            setMessages(
                [...chatMessages,{
                    message: data.choices[0].message.content,
                    sender:"ChatGPT"
                }]
            )
            setTyping(false)
        })
    }
  return (
    <div>
        <MainContainer>
            <ChatContainer>
                <MessageList
                    scrollBehavior='smooth'
                    typingIndicator={typing ? <TypingIndicator content="Tutor is typing"/>:null}
                >
                    {messages.map((message, i)=>{
                        return <Message key={i} model={message}/>
                    })}
                </MessageList>
                <MessageInput placeholder='Type message here' onSend={handleSend}/>
            </ChatContainer>
        </MainContainer>
    </div>
  )
}
