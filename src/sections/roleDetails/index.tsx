import { Link } from 'react-router-dom';

export const RoleDetails = ({
  title,
  icon,
  description,
}: {
  title: string;
  icon: string;
  description: string;
}) => {
  return (
    <section className="flex flex-col md:flex-row justify-around items-center gap-2 p-3">
      <div className="flex justify-center flex-1">
        <img src={icon} className="" alt="" />
      </div>

      <div className="flex flex-col flex-1 gap-2">
        <h1 className="text-6xl font-extrabold">{title}</h1>

        <p className="text-gray-600 max-w-52">{description}</p>

        <Link
          to="/sign-up"
          className="bg-gray-100 text-black px-2 py-1 w-13 rounded-xl flex justify-center items-center"
        >
          Sign Up
        </Link>
      </div>
    </section>
  );
};
