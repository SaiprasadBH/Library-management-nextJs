import type { NextAuthConfig, Session } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/", // Redirect to this page for sign-in
  },
  callbacks: {
    jwt({ token, user, profile }) {
      if (user) {
        const userData = {
          id: user?.id,
          name: user?.name,
          email: user?.email,
          role: user?.role,
          image: profile?.picture,
        };
        token = { ...userData };
      }
      return token;
    },

    session({ session, token }: { session: Session; token: any }) {
      if (token) {
        session.user = token;
      }
      return session;
    },

    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdmin = auth?.user?.role === "admin";

      const isOnDashboard = nextUrl.pathname.startsWith("/user");
      const isOnAdminRoute = nextUrl.pathname.startsWith("/admin");
      const isOnRegister = nextUrl.pathname.startsWith("/register");
      const isOnLogin = nextUrl.pathname.startsWith("/login");
      if (isOnRegister || isOnLogin) {
        return true;
      }

      if (isLoggedIn) {
        if (isAdmin) {
          if (isOnAdminRoute) return true;
          return Response.redirect(new URL("/admin/books", nextUrl));
        } else {
          if (isOnDashboard) return true;
          return Response.redirect(new URL("/user/books", nextUrl));
        }
        return true;
      } else {
        return false;
      }
    },
  },
  providers: [],
} satisfies NextAuthConfig;
