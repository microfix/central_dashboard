import NextAuth from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';

const issuer = process.env.AUTHENTIK_ISSUER;

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  providers: issuer
    ? [
        KeycloakProvider({
          clientId: process.env.AUTHENTIK_CLIENT_ID,
          clientSecret: process.env.AUTHENTIK_CLIENT_SECRET,
          issuer,
          authorization: { params: { scope: 'openid email profile groups' } },
        }),
      ]
    : [],
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        console.log('OIDC Profile:', JSON.stringify(profile));
        token.groups =
          profile.groups ||
          profile.group ||
          profile['https://goauthentik.io/groups'] ||
          profile['goauthentik.io/groups'] ||
          token.groups ||
          [];
        token.preferred_username = profile.preferred_username || token.preferred_username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.groups = token.groups || [];
      session.user.username = token.preferred_username;
      return session;
    },
  },
};

export default NextAuth(authOptions);
