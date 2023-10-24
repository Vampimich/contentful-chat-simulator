"use client";
import React, {useEffect, useState, ChangeEvent, FormEvent,} from 'react';

import { Messages } from '../interfaces/messages';
import { Conversation } from '../interfaces/conversation';

import Input from '../components/input/Input';
import ClientMessageSender from '@/components/clientMessageSender/ClientMessageSender';
import ChatLayout from '../components/chatLayout/ChatLayout';
import ClientUser from '@/components/clientUser/ClientUser';
//import {ContentfulService} from '../core/contentful';
import { createClient, EntryCollection } from 'contentful';

const contentfulManagement = require("contentful-management");

const Space = process.env.NEXT_PUBLIC_SPACE_ID!;
const Token = process.env.NEXT_PUBLIC_DELIVERY_TOKEN!;

const CMAToken = process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN;

const client = createClient({
  accessToken: Token,
  space: Space,
  environment: "master"
})

const managementClient =  contentfulManagement.createClient({
  accessToken: CMAToken,
})


function IndexPage() {
  const [results, setResults] = useState<null | EntryCollection<Messages>>(null);
  const [conversations, setConversations] = useState<null | EntryCollection<Conversation>>(null);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false)

  const handleInputchange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  useEffect(() => {
  }, [])

  return <div>
    <ChatLayout></ChatLayout>
  </div>
}

export default IndexPage;
//<ClientMessageSender></ClientMessageSender>

