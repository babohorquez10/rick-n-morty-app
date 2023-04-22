type CharacterDetailItemProps = {
  title: string;
  value: string;
};

const CharacterDetailItem: React.FC<CharacterDetailItemProps> = ({
  title,
  value,
}) => {
  return (
    <div className="border-t border-t-primary-100 py-4">
      <h4 className="font-semibold text-base leading-5">{title}</h4>
      <p className="font-normal text-base leading-5 text-grey">{value}</p>
    </div>
  );
};

export default CharacterDetailItem;
