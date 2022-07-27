import Interaction from "./interactionitem";

const Interactions = ({ interactions }) => {
  if (!interactions) return null;

  return (
    <>
      {interactions.map((interaction, index) => (
        <Interaction key={index} interaction={interaction} />
      ))}
    </>
  );
};

export default Interactions;
