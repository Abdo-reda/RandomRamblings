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
  notification: string;
  posts: any[];
}

export const NewsletterEmail = ({
  theme,
  notification,
  posts,
}: EmailProps) => {
  const selectedTheme = theme === "dark" ? darkTheme : lightTheme;
  const isMonthly = notification === "monthly";

  const currentDate = new Date();
  const currentDayInMonth = currentDate.getUTCDate();
  const currentDayInWeek = currentDate.getUTCDay();

  let weekCount = 1;
  for (let i = 1; i <= currentDayInMonth; i++) {
    const tempDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      i
    );
    if (tempDay.getUTCDay() === currentDayInWeek) {
      weekCount++;
    }
  }

  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  currentDate.setMonth(currentDate.getMonth() - 1);
  const previousMonth = currentDate.toLocaleString("default", {
    month: "long",
  });
  return (
    <Html>
      <Head>
        <style>
          {`
            ::selection {
              background-color: ${PRIMARY_DARK};
              color: ${LIGHT};
            }

            .post-section:hover h3 {
              color: ${PRIMARY}
            }

            .post-section:hover img {
              border: 2px solid ${PRIMARY} !important;
            }

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
      <Preview>Newsletter</Preview>
      <Body style={selectedTheme.main}>
        <Container style={selectedTheme.container}>
          <Img
            style={selectedTheme.image}
            src="https://www.random-ramblings.me/main.webp"
            width="400"
            alt="NoPoint Logo"
          />
          <Heading as="h2" style={selectedTheme.h2}>
            {isMonthly ? previousMonth : currentMonth} Newsletter{" "}
            {isMonthly ? "" : `- Week ${weekCount}`}
          </Heading>

          {posts?.map((post, index) => (
            <Link
              key={index}
              href={`https://random-ramblings.me/posts/post-${post.post}`}
              target="_blank"
              style={selectedTheme.cardLink}
            >
              <div className="post-section" style={selectedTheme.postSection}>
                <div>
                  <Img
                    style={selectedTheme.postImage}
                    src={`https://www.random-ramblings.me/posts/post-${post.post}.webp`}
                    width="130"
                    alt={post.image.alt}
                  ></Img>
                </div>
                <div>
                  <Heading as="h3" style={selectedTheme.h3}>
                    {post.title}
                  </Heading>
                  <Text style={selectedTheme.summary}> {post.summary}</Text>
                  <div style={selectedTheme.badge}>
                    <span>{post.date.toDateString()}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          <Text style={selectedTheme.footer}>
            Click here to{" "}
            <Link
              href="https://random-ramblings.me/status/newsletter-unsubscribe-success?token=PLACEHOLDER_TOKEN"
              target="_blank"
              style={selectedTheme.link}
            >
              unsubscribe
            </Link>
            .
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

export default NewsletterEmail;

const PRIMARY = "#7f3737";
const PRIMARY_LIGHT = "#ca6a6a";
const PRIMARY_DARK = "#664949";
const DARK = "#161616";
const DARK_ACCENT = "#323232";
const DARK_LIGHT = "#4d4d4d;";
const DARK_LIGHER = "#7e7e7e";
const LIGHT = "#ffffff";
const LIGHT_ACCENT = "#f1f0ea";

const darkTheme = {
  main: {
    fontFamily:
      "'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    color: LIGHT,
  },
  badge: {
    backgroundColor: DARK_LIGHT,
    borderRadius: "4px",
    fontSize: "x-small",
    width: "fit-content",
    padding: "6px",
    fontWeight: "bold",
  },
  postSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "28px 0px",
  },
  image: {
    margin: "auto",
  },
  postImage: {
    margin: "0px 20px",
    borderRadius: "16px",
    border: `2px solid ${DARK_ACCENT}`,
  },
  container: {
    backgroundColor: DARK,
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
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
  },
  h3: {
    textDecoration: `underline ${PRIMARY}`,
    textDecorationThickness: "2px",
    textUnderlineOffset: "4px",
    fontSize: "22px",
    margin: "0",
    fontWeight: "bold",
  },
  link: {
    color: PRIMARY_LIGHT,
    textDecoration: "none",
  },
  cardLink: {
    color: "inherit",
    textDecoration: "none",
  },
  text: {
    fontSize: "18px",
    hyphens: "none",
    lineHeight: "1.5",
  },
  summary: {
    color: DARK_LIGHER,
    fontSize: "16px",
    marginTop: "16px",
    marginBottom: "8px",
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
  badge: {
    backgroundColor: LIGHT,
    borderRadius: "4px",
    fontSize: "x-small",
    width: "fit-content",
    padding: "6px",
    fontWeight: "bold",
  },
  postSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "28px 0px",
  },
  image: {
    margin: "auto",
  },
  postImage: {
    margin: "0px 20px",
    borderRadius: "16px",
    border: `2px solid ${DARK_LIGHT}`,
  },
  container: {
    backgroundColor: LIGHT_ACCENT,
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
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
  },
  h3: {
    textDecoration: `underline ${PRIMARY}`,
    textDecorationThickness: "2px",
    textUnderlineOffset: "4px",
    fontSize: "22px",
    margin: "0",
    fontWeight: "bold",
  },
  link: {
    color: PRIMARY_LIGHT,
    textDecoration: "none",
  },
  cardLink: {
    color: "inherit",
    textDecoration: "none",
  },
  text: {
    fontSize: "18px",
    hyphens: "none",
    lineHeight: "1.5",
  },
  summary: {
    color: DARK_LIGHER,
    fontSize: "16px",
    marginTop: "16px",
    marginBottom: "8px",
  },
  footer: {
    color: DARK_LIGHT,
    fontSize: "14px",
    margin: "0px",
  },
};
