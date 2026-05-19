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
  invitedBy: {
    name: string;
    email: string;
  };
  workspace: string;
  inviteURL: string;
}

export const previewProps = {
  invitedBy: {
    name: "Serkan",
    email: "mr.serkanbircan@gmail.com",
  },
  workspace: "Götür",
  inviteURL:
    "https://usecleon.com/api/invitations/accept?token=Eoyx2XmOu+9SOXNlAkFt0ZsjLfOe53dLbkzKLOs9gsfKbjAgWQ70RuHn+grDZXLGEZD21KkI5xLwXVFhvgm9Lw",
} satisfies Props;

export const Template = ({
  invitedBy,
  workspace: workspaceName,
  inviteURL,
}: Props) => {
  const previewText = `Accept your invitation to collaborate with the team.`;

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
                alt={`${workspaceName} Logo`}
                className="mx-auto my-0 rounded-md object-cover"
              />
            </Section>

            <Section className="mt-[24px] text-center">
              <Heading className="text-neutralDark text-[24px] font-bold p-0 my-[16px] mx-0 tracking-tight">
                Join <strong>{workspaceName}</strong>
              </Heading>
            </Section>

            <Section className="mb-[24px]">
              <Text className="text-neutralLight text-[15px] leading-[24px]">
                Hello,
              </Text>
              <Text className="text-neutralLight text-[15px] leading-[24px]">
                <strong>{invitedBy.name}</strong> (
                <Link
                  href={`mailto:${invitedBy.email}`}
                  className="text-brand no-underline"
                >
                  {invitedBy.email}
                </Link>
                ) has invited you to collaborate on the{" "}
                <strong>{workspaceName}</strong> workspace.
              </Text>
              <Text className="text-neutralLight text-[15px] leading-[24px]">
                Accept your invitation to collaborate with the team.
              </Text>
            </Section>

            <Section className="text-center mt-[32px] mb-[32px]">
              <Link
                href={inviteURL}
                className="bg-brand hover:bg-brandHover text-white! text-[14px] font-semibold no-underline text-center px-[24px] py-[12px] rounded-md inline-block shadow-sm"
              >
                Accept Invitation
              </Link>
            </Section>

            <Section className="mb-[24px]">
              <Text className="text-slate-400 text-[12px] leading-[20px]">
                If the button above doesn't work, copy and paste this URL into
                your browser:
              </Text>
              <Text className="m-0 break-all">
                <Link
                  href={inviteURL}
                  className="text-brand text-[12px] hover:underline!"
                >
                  {inviteURL}
                </Link>
              </Text>
            </Section>

            <Hr className="border border-solid border-slate-100 my-[24px]" />

            <Section className="text-center">
              <Text className="text-slate-400 text-[12px] leading-[18px] m-0">
                This invitation was sent to you because your email was added to
                this workspace. If you were not expecting this invite, you can
                safely ignore this email.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
