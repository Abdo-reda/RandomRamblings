import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Img,
} from "npm:@react-email/components@0.0.31";
import * as React from "npm:react@19.0.0";

interface EmailProps {
  theme: string;
  token: string;
}

export const NewsletterConfirmationEmail = ({ theme, token }: EmailProps) => {
  const selectedTheme = theme === "dark" ? darkTheme : lightTheme;
  return (
    <Html>
      <Head>
        <style>
          {`
            a:focus, a:hover {
              outline: none;
              border-bottom: 2px solid ${PRIMARY};
            }

            a:visited {
              color: var(--primary-dark);
              text-decoration: none;
            }
          `}
        </style>
      </Head>
      <Preview>RandomRamblings Newsletter Confirmation</Preview>
      <Body style={selectedTheme.main}>
        <Container style={selectedTheme.container}>
          <Img
            style={selectedTheme.image}
            src="https://www.random-ramblings.me/main.png"
            width="400"
            alt="NoPoint Logo"
          />
          <Heading as="h2" style={selectedTheme.h2}>
            Newsletter Confirmation
          </Heading>
          <Text style={selectedTheme.text}>
            It seems you are trying to register for the RandomRamblings newsletter,{" "}
            <Link
              href={`https://random-ramblings.me/status/newsletter-subscribe-success?token=${token}`}
              target="_blank"
              style={selectedTheme.link}
            >
              click here to confirm
            </Link>{" "}
            your registration.
          </Text>
          <Text style={selectedTheme.text}>
            If not, you can safely ignore this email.
          </Text>
          <Text style={selectedTheme.footer}>
            2024{" "}
            <Link
              href="https://random-ramblings.me/"
              target="_blank"
              style={selectedTheme.link}
            >
              RandomRamblings
            </Link>{" "}
            by{" "}
            <Link
              href="https://github.com/Abdo-reda"
              target="_blank"
              style={selectedTheme.link}
            >
              NoPoint
            </Link>
            .
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default NewsletterConfirmationEmail;

const PRIMARY = "#7f3737";
const PRIMARY_LIGHT = "#ca6a6a";
const PRIMARY_DARK = "#664949";
const DARK = "#161616";
const DARK_ACCENT = "#323232";
const DARK_LIGHT = "#4d4d4d;";
const LIGHT = "#ffffff";
const LIGHT_ACCENT = "#f1f0ea";

const darkTheme = {
  main: {
    fontFamily:
      "'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    color: LIGHT,
  },
  image: {
    margin: "auto",
  },
  container: {
    backgroundColor: DARK,
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
  },
  h1: {
    fontSize: "42px",
    margin: "0",
    marginBottom: "5px",
    fontWeight: 600,
  },
  h2: {
    textDecoration: `underline ${PRIMARY}`,
    textDecorationThickness: "4px",
    textUnderlineOffset: "6px",
    fontSize: "32px",
    marginBottom: "0",
    fontWeight: "bold",
    position: "relative",
  },
  link: {
    color: PRIMARY_LIGHT,
    textDecoration: "none",
  },
  text: {
    fontSize: "18px",
    hyphens: "none",
    lineHeight: "1.5",
  },
  footer: {
    color: DARK_LIGHT,
    fontSize: "14px",
    margin: "0px",
  },
};

const lightTheme = {
  main: {
    fontFamily:
      "'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    color: DARK,
  },
  image: {
    margin: "auto",
  },
  container: {
    backgroundColor: LIGHT_ACCENT,
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
  },
  h1: {
    fontSize: "42px",
    margin: "0",
    marginBottom: "5px",
    fontWeight: 600,
  },
  h2: {
    textDecoration: `underline ${PRIMARY}`,
    textDecorationThickness: "4px",
    textUnderlineOffset: "6px",
    fontSize: "32px",
    marginBottom: "0",
    fontWeight: "bold",
    position: "relative",
  },
  link: {
    color: PRIMARY_LIGHT,
    textDecoration: "none",
  },
  text: {
    fontSize: "18px",
    hyphens: "none",
    lineHeight: "1.5",
  },
  footer: {
    color: DARK_LIGHT,
    fontSize: "14px",
    margin: "0px",
  },
};
