"use client";
import React, {useEffect, useState} from 'react';
import { createClient, EntryCollection } from 'contentful';

import Archive from '@/components/archive/Archive';

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


function ArchivePage() {

  return <Archive></Archive>
}

export default ArchivePage;



/***
    // Create entry
    managementClient.getSpace(Space)
    .then((space: any) => space. getEnvironment('master'))
    .then((environment: any) => environment.createEntryWithId('messages', 'newMessage', {
      fields: {
        messageTitle: {
          'en-US': 'Entry title 1'
        },
        messageAuthor: {
          'en-US': 'Pepe'
        },
        messageSent: {
          'en-US': 'date'
        },
        messageBody: {
          'en-US': 'Hi there'
        }
      }
    }))
    .then((entry: any) => {
      console.log(entry);
      entry.publish();
    })
    .catch(console.error);










     managementClient.getSpace(Space)
    .then((space: any) => space. getEnvironment('master'))
    .then((environment: any) => environment.createEntryWithId('conversation', 'newConversation', {
      fields: {
        conversationTitle: {
          'en-US': 'Entry conver 1'
        },
        messageTranscript: {
          'en-US': [{
            "sys": {
              "type": "Link",
              "linkType": "Entry",
              "id" : "38xTsge74jxY1AdA1DNaCh"
            }
           
          },{
            "sys": {
              "type": "Link",
              "linkType": "Entry",
              "id" : "1YKAcS3IPRfNEol62I3Epr"
            }
           
          }]
        }
        


      }
    }))
    .then((entry: any) => {
      console.log(entry);
      entry.publish();
    })
    .catch(console.error);


 */