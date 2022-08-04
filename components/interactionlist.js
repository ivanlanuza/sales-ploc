import Interaction from "./interactionitem";

const Interactions = ({ interactions, companyid }) => {
  if (!interactions) return null;

  return (
    <>
      {interactions.map((interaction, index) => (
        <Interaction
          key={index}
          interaction={interaction}
          companyid={companyid}
        />
      ))}
    </>
  );
};

export default Interactions;
