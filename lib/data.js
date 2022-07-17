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

export const getStatus = async (prisma) => {
  const status = await prisma.status.findMany({
    where: {},
  });

  return status;
};

export const getCompanies = async (prisma, take) => {
  const company = await prisma.company.findMany({
    where: {},
    orderBy: [
      {
        name: "asc",
      },
    ],
    include: {
      segment: true,
      source: true,
      businesstype: true,
      status: true,
    },
    take,
  });

  return company;
};

export const getCompany = async (id, prisma) => {
  const company = await prisma.company.findUnique({
    where: {
      id: id,
    },
    include: {
      segment: true,
      source: true,
      businesstype: true,
      status: true,
      ContactInfo: true,
    },
  });

  return company;
};
