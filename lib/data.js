export const getUserAuth = async (email, prisma) => {
  const userauth = await prisma.user.findMany({
    where: {
      email: email,
      isActive: true,
    },
  });

  return userauth;
};

export const getSegment = async (prisma) => {
  const segment = await prisma.segment.findMany({
    where: {},
  });

  return segment;
};

export const getSource = async (prisma) => {
  const source = await prisma.source.findMany({
    where: {},
  });

  return source;
};

export const getBusinessType = async (prisma) => {
  const businesstype = await prisma.businessType.findMany({
    where: {},
  });

  return businesstype;
};
