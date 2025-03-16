import ContainerWrapper from '../ContainerWrapper';
import { AuthLinks } from '../navbar/NavbarContent10';

export const Footer = () => {
  return (
    <footer className="flex flex-col bg-black ">
      <ContainerWrapper>
        <div className="pt-5 pb-3 flex flex-col md:flex-row gap-3 md:gap-0 justify-between items-center">
          <img src="/assets/images/footer_logo.png" alt="logo" className="h-7.5 w-12 rounded-md" />

          <div className="flex justify-between items-center gap-3">
            <div className="flex flex-col justify-center items-center">
              <span className="text-gray-400 text-xs">Phone</span>
              <span className="text-white text-sm">(123) 456 7890</span>
            </div>

            <span className="h-1.5 border "></span>

            <div className="flex flex-col justify-center items-center">
              <span className="text-gray-400 text-xs">Email</span>
              <span className="text-white text-sm">demo@levelhub.com</span>
            </div>

            <span className="h-1.5 border "></span>

            <div className="flex flex-col justify-center items-center gap-0.5">
              <span className="text-gray-400 text-xs">Social</span>
              <span className="text-white text-sm flex gap-1">
                <img src="/assets/images/twitter_icon.png" alt="logo" className="h-2" />
                <img src="/assets/images/fb_icon.png" alt="logo" className="h-2" />
              </span>
            </div>
          </div>

          <AuthLinks />
        </div>
      </ContainerWrapper>

      <div className="border-t border-gray-800 text-center text-gray-500 text-sm pt-1 pb-1.5">
        © 2025 Level Hub.
      </div>
    </footer>
  );
};
