const CustomerQA = ({ question, answer }) => {
  if (!question && !answer) return null;

  return (
    <div className="mb-4 px-3 py-2 border border-[#EEEEEE] rounded-lg">
      {question && <h4 className="text-base font-semibold mb-1">{question}</h4>}
      {answer && <p className="text-sm font-normal text-gray-700">{answer}</p>}
    </div>
  );
};

export default CustomerQA;
