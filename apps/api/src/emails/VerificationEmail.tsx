import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "jsx-email";

interface Props {
  verificationURL: string;
}

export const previewProps = {
  verificationURL: "https://usecleon.com/api/auth/verify?code=482915",
} satisfies Props;

export const Template = ({ verificationURL }: Props) => {
  const previewText = "Verify your email address";

  return (
    <Html lang="en">
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind
        production
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#4f46e5",
                brandHover: "#4338ca",
                neutralDark: "#1f2937",
                neutralLight: "#4b5563",
              },
            },
          },
        }}
      >
        <Body className="bg-slate-50 font-sans antialiased my-auto mx-auto px-2">
          <Container className="border border-solid border-slate-200 rounded-lg my-[40px] mx-auto p-[32px] max-w-[465px] bg-white shadow-sm">
            <Section className="mt-4 text-center">
              <Img
                src="https://s3.valargames.com/docmost/logoipsum-419.png"
                width="56"
                height="56"
                alt="Logo"
                className="mx-auto my-0 rounded-md object-cover"
              />
            </Section>

            <Section className="mt-[24px] text-center">
              <Heading className="text-neutralDark text-[24px] font-bold p-0 my-[16px] mx-0 tracking-tight">
                Verify your email address
              </Heading>
            </Section>

            <Section className="mb-[24px]">
              <Text className="text-neutralLight text-[15px] leading-[24px]">
                Hello, <br />
                Please use the following link to verify your email address:
              </Text>
            </Section>

            <Section className="text-center mt-[24px] mb-[32px]">
              <Link
                href={verificationURL}
                className="bg-brand hover:bg-brandHover text-white! text-[14px] font-semibold no-underline text-center px-[24px] py-[12px] rounded-md inline-block shadow-sm"
              >
                Verify Email
              </Link>
            </Section>

            <Section className="mb-[24px]">
              <Text className="text-slate-400 text-[12px] leading-[20px]">
                If the button doesn't work, you can copy and paste this link
                into your browser:
              </Text>
              <Text className="m-0 break-all">
                <Link
                  href={verificationURL}
                  className="text-brand text-[12px] hover:underline!"
                >
                  {verificationURL}
                </Link>
              </Text>
            </Section>

            <Hr className="border border-solid border-slate-100 my-[24px]" />

            <Section className="text-center">
              <Text className="text-slate-400 text-[12px] leading-[18px] m-0">
                If you did not request this email, please ignore it or contact
                support if you have concerns.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
