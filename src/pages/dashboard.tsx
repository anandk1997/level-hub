import { Box, Button, Container, Typography } from '@mui/material';
import Navbar10 from 'src/components/navbar/Navbar10';
import NavbarContent10 from 'src/components/navbar/NavbarContent10';

const Dashboard = () => {
  return (
    <>
      <Box sx={{ bgcolor: 'grey.100' }}>
        <Navbar10>
          <NavbarContent10 navItems={navItems} />
        </Navbar10>
      </Box>

      <Container>
        <section className="flex flex-col md:flex-row justify-around items-center gap-2 mt-4 p-3">
          <div className="flex flex-col gap-3">
            <Typography className="text-[#FF991F] !font-semibold">START TO SUCCESS</Typography>
            <img src="/assets/images/Introducing_level_hub.png" alt="" />

            <span className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, magni?
            </span>

            <div className="flex flex-col md:flex-row items-center align-middle">
              <Button className="!bg-[#09C0F0] !px-3.5 !py-1.5 !rounded-xl !text-white !text-md">
                Learn More
              </Button>

              <Button className="!flex !mt-3">
                <img src="/assets/images/play_icon.png" className="h-14 ml-[-10px]" alt="" />

                <span className="text-gray-700 font-medium text-md mb-3 ml-[-10px]">
                  Watch how it works
                </span>
              </Button>
            </div>
          </div>

          <div className="">
            <img src="/assets/images/phone_level_hub.png" alt="" />
          </div>
        </section>

        <section className="flex flex-col md:flex-row justify-around items-center gap-2 p-3">
          <div className="flex justify-center flex-1">
            <img src="/assets/images/productivity_partner.png" className="" alt="" />
          </div>

          <div className="flex flex-col flex-1 gap-2">
            <img src="/assets/images/your_productivity_partner.png" className="h-10 w-40" alt="" />

            <p className="text-gray-600 max-w-52">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo non molestias in, iste
              explicabo deserunt quis labore dolorum iure debitis velit, quos, soluta vitae
              obcaecati quae. Illo dignissimos voluptate sapiente earum dicta non laboriosam! Quae
              quam, ullam debitis voluptas rem iusto nostrum incidunt? Praesentium quo similique
              omnis eligendi quam corrupti distinctio harum error necessitatibus rem! Ullam a
              numquam voluptates placeat ut aliquid nulla dicta adipisci sit. Dolorum numquam qui
              harum doloribus repellendus blanditiis veritatis, est voluptatem sunt sint praesentium
              adipisci maiores iusto, ex molestiae illum quas error incidunt? Repellendus asperiores
              nulla, totam soluta eius saepe ad quia ratione nisi voluptatum?
            </p>
          </div>
        </section>

        <section className="p-3">
          <h2 className="text-center text-3xl font-extrabold mb-2">Features</h2>

          <span className="flex flex-col text-center text-gray-600 text-md">
            <span>
              TOTC is one powerful online software suite that combines all the tools needed to
            </span>
            <span>run a successful school or office.</span>
          </span>

          <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-10 md:gap-6 mt-12">
            {[
              { title: 'SINGLE USER', icon: '/assets/images/user_icon.png' },
              { title: 'COACHES', icon: '/assets/images/coaches_icon.png' },
              { title: 'BUSINESS/TEAMS', icon: '/assets/images/business_teams_icon.png' },
            ].map((item, index) => (
              <div
                key={index}
                className="relative flex flex-col justify-center items-center gap-2 rounded-2xl md:w-[30%] shadow-lg p-6 bg-white border border-gray-200"
              >
                <img
                  src={item.icon}
                  alt={item.title}
                  className="absolute -top-6 w-14 h-14 object-cover rounded-full"
                />
                <h3 className="font-bold text-lg mt-5">{item.title}</h3>
                <p className="text-center text-gray-600">
                  Schedule and reserve classrooms at one campus or multiple campuses. Keep detailed
                  records of student attendance.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col md:flex-row justify-between items-center gap-4 p-6">
          <div className="flex justify-center flex-1 min-w-0">
            <img src="/assets/images/testimonials.png" className="max-w-full" alt="Testimonials" />
          </div>

          <div className="flex flex-col flex-1 min-w-0 gap-4 w-full">
            <img
              src="/assets/images/testimonials_title.png"
              className="h-10 w-40"
              alt="Testimonials Title"
            />

            <p className="text-gray-600 max-w-64">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo non molestias in, iste
              explicabo deserunt quis labore dolorum iure debitis velit, quos, soluta vitae
              obcaecati quae.
            </p>

            <div className="relative w-full overflow-hidden flex items-center">
              <button
                className="p-2 h-10 w-10 bg-transparent cursor-pointer flex-shrink-0"
                onClick={() =>
                  document
                    .getElementById('scroll-container')!
                    .scrollBy({ left: -250, behavior: 'smooth' })
                }
              >
                ◀
              </button>

              <div
                id="scroll-container"
                className="flex gap-6 overflow-x-auto h-auto max-h-[300px] w-full pb-4 pr-2 scrollbar-hide snap-x snap-mandatory"
              >
                {[
                  { title: 'SINGLE USER', icon: '/assets/images/user_icon.png' },
                  { title: 'COACHES', icon: '/assets/images/coaches_icon.png' },
                  { title: 'BUSINESS/TEAMS', icon: '/assets/images/business_teams_icon.png' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="relative flex flex-col justify-center items-center gap-2 rounded-2xl h-28 min-w-[200px] md:min-w-[250px] p-6 bg-[#F4F4F4] snap-center"
                  >
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="absolute -top-6 w-14 h-14 object-cover rounded-full"
                    />
                    <h3 className="font-bold text-lg mt-5">{item.title}</h3>
                    <p className="text-center text-gray-600 line-clamp-2">
                      Schedule and reserve classrooms at one campus or multiple campuses. Keep
                      detailed records of student attendance.
                    </p>
                  </div>
                ))}
              </div>

              <button
                className="p-2 h-10 w-10 bg-transparent cursor-pointer flex-shrink-0"
                onClick={() =>
                  document
                    .getElementById('scroll-container')!
                    .scrollBy({ left: 250, behavior: 'smooth' })
                }
              >
                ▶
              </button>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
};

export default Dashboard;

export const navItems = [
  { link: 'home', title: 'Home' },
  { link: 'features', title: 'Features' },
  { link: 'reviews', title: 'Reviews' },
  { link: 'about-us', title: 'About Us' },
];
