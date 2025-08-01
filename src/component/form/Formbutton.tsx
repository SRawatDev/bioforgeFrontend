type Props = {
  text: string;
};

const Formbutton = ({ text }: Props) => {
  return (
    <button type="submit" className="register-btn-primary formButtton">
      {text}
    </button>
  );
};

export default Formbutton;
