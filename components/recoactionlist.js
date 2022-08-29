import RecoActionItem from "./recoactionitem";

const RecoActionList = ({ recoactions, status }) => {
  if (!recoactions) return null;

  return (
    <>
      {recoactions.map((recoaction, index) => (
        <RecoActionItem key={index} recoaction={recoaction} status={status} />
      ))}
    </>
  );
};

export default RecoActionList;
