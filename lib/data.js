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
    orderBy: [
      {
        name: "asc",
      },
    ],
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
      ContactInfo: {
        where: {
          isDeleted: false,
        },
      },
    },
  });

  return company;
};

export const getContact = async (cid, id, prisma) => {
  const contact = await prisma.contactInfo.findMany({
    where: {
      id: cid,
      companyId: id,
    },
  });

  return contact[0];
};

export const getSimpleCompanyList = async (prisma) => {
  const companies = await prisma.company.findMany({
    select: {
      id: true,
      name: true,
    },
    where: {
      isActive: true,
    },
    orderBy: [
      {
        name: "asc",
      },
    ],
  });

  return companies;
};

export const getInteractions = async (id, prisma) => {
  const interactions = await prisma.action.findMany({
    orderBy: [
      {
        businessDate: "desc",
      },
      {
        id: "desc",
      },
    ],
    where: {
      companyId: id,
    },
    include: {
      ActionData: {
        include: {
          field: true,
        },
      },
      actiontype: true,
      user: true,
    },
  });

  return interactions;
};

export const getInteraction = async (iid, cid, prisma) => {
  const interaction = await prisma.action.findMany({
    where: {
      companyId: cid,
      id: iid,
    },
    include: {
      ActionData: {
        include: {
          field: true,
        },
      },
      actiontype: true,
    },
  });
  //console.log(interaction);
  return interaction;
};

export const getUsers = async (prisma) => {
  const users = await prisma.user.findMany({
    where: {
      isActive: true,
    },
    select: {
      email: true,
      id: true,
    },
  });
  //console.log(users);
  return users;
};
