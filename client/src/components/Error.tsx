type Error = {
  message: string ;
};

const Error = ({ message }: Error) => {
  return <p className="text-red-500">{message}</p>;
};

export default Error;
