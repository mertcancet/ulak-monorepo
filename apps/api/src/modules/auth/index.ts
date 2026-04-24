import Elysia from "elysia";
import auth from "~/lib/auth";
import problemDetails from "~/plugins/problem-details";

const authModule = () =>
  new Elysia({ name: "auth", prefix: "/auth", tags: ["Auth"] })
    .mount(auth.handler)
    .use(problemDetails())
    .macro({
      requireAuth: {
        async resolve({ status, problem, request: { headers } }) {
          const session = await auth.api.getSession({
            headers,
          });

          if (!session) {
            return status(
              401,
              problem({
                title: "Unauthorized",
                status: 401,
              }),
            );
          }

          return {
            user: session.user,
            session: session.session,
          };
        },
      },
    });

export default authModule;
