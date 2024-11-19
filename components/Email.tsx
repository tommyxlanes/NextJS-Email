import * as React from 'react';
import {
  Html,
  Body,
  Head,
  Hr,
  Container,
  Preview,
  Section,
  Text,
  Heading,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

type EmailTemplateProps = {
  email: string;
  message: string;
};

export const EmailTemplate = ({ message, email }: EmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>New message from LITTO</Preview>
      <Tailwind>
        <Body>
          <Container>
            <Section>
              <Heading>You received a message from LITTO</Heading>
              <Text>{message}</Text>
              <Hr />
              <Text>The sender's email {email}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
