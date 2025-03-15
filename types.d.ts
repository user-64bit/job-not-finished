import "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      githubUsername?: string;
    };
  }

  interface User {
    githubUsername?: string;
  }

  interface JWT {
    githubUsername?: string;
  }
} 