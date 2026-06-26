import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "jsx-email";

interface Props {
  passwordResetURL: string;
}

export const previewProps = {
  passwordResetURL:
    "https://usecleon.com/auth/reset-password/zqxLMiBp8ctMmcdW99Lit0ay?callbackURL=https%3A%2F%2Fusecleon.com",
} satisfies Props;

export const Template = ({ passwordResetURL }: Props) => {
  const previewText = "Reset your password";

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
                Reset your password
              </Heading>
            </Section>

            <Section className="mb-[24px]">
              <Text className="text-neutralLight text-[15px] leading-[24px]">
                We received a request to reset your password. <br />
              </Text>
              <Text className="text-neutralLight text-[15px] leading-[24px]">
                If you didn't request this, you can ignore this email. Your
                password will remain safe and unchanged.
              </Text>
            </Section>

            <Section className="text-center mt-[24px] mb-[32px]">
              <Link
                href={passwordResetURL}
                className="bg-brand hover:bg-brandHover text-white! text-[14px] font-semibold no-underline text-center px-[24px] py-[12px] rounded-md inline-block shadow-sm"
              >
                Change Password
              </Link>
            </Section>

            <Section>
              <Text className="text-slate-400 text-[12px] leading-[20px]">
                If the button doesn't work, you can copy and paste this link
                into your browser:
              </Text>
              <Text className="m-0 break-all">
                <Link
                  href={passwordResetURL}
                  className="text-brand text-[12px] hover:underline!"
                >
                  {passwordResetURL}
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
