export const getUserAuth = async (email, prisma) => {
  const userauth = await prisma.user.findMany({
    where: {
      email: email,
      isActive: true,
    },
  });

  return userauth;
};
