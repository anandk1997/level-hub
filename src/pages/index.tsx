import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { HelmetTitle } from 'src/components/HelmetTitle';
import { Iconify } from 'src/components/iconify';
import { route } from 'src/utils/constants/routes';
import { INavLink } from 'src/components/navbar/types';
import { East, PlayCircleFilledWhiteOutlined, West } from '@mui/icons-material';
import { Rating } from '@mui/material';

const Dashboard: React.FC = () => {
  const homeId: INavLink = 'home';
  const featuresId: INavLink = 'features';
  const reviewsId: INavLink = 'reviews';
  const aboutUsId: INavLink = 'about-us';

  return (
    <>
      <HelmetTitle title="Dashboard" />

      <Container>
        <section
          className="flex flex-col md:flex-row justify-around items-center gap-2 mt-4 p-3"
          id={homeId}
        >
          <div className="flex flex-col gap-3">
            <Typography className="text-[#FF991F] !font-semibold">START TO SUCCESS</Typography>
            <img src="/assets/images/dashboard/Introducing_level_hub.png" alt="Introduction" />
            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, magni?</span>
            <div className="flex flex-col md:flex-row md:gap-1.5 items-center align-middle">
              <Button className="!bg-[#09C0F0] !px-3.5 !py-1.5 !rounded-xl !text-white !text-md">
                Learn More
              </Button>

              <Button className="!flex !justify-center !items-center gap-1.5 !text-lg !font-light !text-gray-700">
                <PlayCircleFilledWhiteOutlined sx={{ fontSize: 40, color: '#FF991F' }} />
                Watch how it works
              </Button>
            </div>
          </div>

          <div>
            <img src="/assets/images/dashboard/phone_level_hub.png" alt="Phone display" />
          </div>
        </section>

        <section className="flex flex-col md:flex-row justify-around items-center gap-2 p-3">
          <div className="flex justify-center flex-1">
            <img src="/assets/images/dashboard/productivity_partner.png" className="" alt="" />
          </div>

          <div className="flex flex-col flex-1 gap-2">
            <img
              src="/assets/images/dashboard/your_productivity_partner.png"
              className="h-10 w-40"
              alt=""
            />

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

        <section className="p-3" id={featuresId}>
          <h2 className="text-center text-3xl font-extrabold mb-2">Features</h2>

          <span className="flex flex-col text-center text-gray-600 text-md">
            <span>
              TOTC is one powerful online software suite that combines all the tools needed to
            </span>
            <span>run a successful school or office.</span>
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 md:gap-6 mt-12 justify-center">
            {roles.map((item: IRole, index: number) => (
              <div
                key={index}
                className="relative flex flex-col justify-center items-center gap-2 rounded-2xl shadow-lg p-3 bg-white border border-gray-200"
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
                <Link to={item.path} className="rounded-lg bg-gray-100 px-2 py-1 text-sm">
                  Learn More
                  <Iconify
                    icon="solar:arrow-right-linear"
                    width="24"
                    height="24"
                    className="ml-1"
                  />
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section
          className="flex flex-col md:flex-row justify-between items-center gap-4 pl-6 pr-2 py-6"
          id={reviewsId}
        >
          <div className="flex justify-center flex-1 min-w-0">
            <img
              src="/assets/images/dashboard/testimonials.png"
              className="max-w-full"
              alt="Testimonials"
            />
          </div>

          <div className="flex flex-col flex-1 min-w-0 gap-4 w-full">
            <img
              src="/assets/images/dashboard/testimonials_title.png"
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
                className="h-10 w-5 bg-transparent cursor-pointer flex-shrink-0"
                onClick={() =>
                  document
                    .getElementById('scroll-container')
                    ?.scrollBy({ left: -250, behavior: 'smooth' })
                }
              >
                <West />
              </button>

              <div
                id="scroll-container"
                className="flex gap-6 overflow-x-auto h-auto max-h-[300px] w-full pb-2 pr-2 scrollbar-hide snap-x snap-mandatory scrollbar-none"
              >
                {[
                  { title: 'Judy Robert', icon: '/assets/images/dashboard/user_icon.png' },
                  { title: 'Tony White', icon: '/assets/images/dashboard/coaches_icon.png' },
                  {
                    title: 'Judy Robert',
                    icon: '/assets/images/dashboard/business_teams_icon.png',
                  },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center gap-4">
                    <div className="relative flex flex-col justify-center items-center gap-2 rounded-2xl min-w-[200px] md:min-w-[250px] p-3 bg-[#F4F4F4] snap-center">
                      <img
                        src={item.icon}
                        alt={item.title}
                        className="absolute -bottom-6 w-10 h-10 object-cover rounded-full"
                      />
                      <p className="text-center text-gray-600 line-clamp-2">
                        Schedule and reserve classrooms at one campus or multiple campuses. Keep
                        detailed records of student attendance.
                      </p>

                      <Rating name="read-only" value={2} readOnly />
                    </div>

                    <div className="font-bold">{item.title}</div>
                  </div>
                ))}
              </div>

              <button
                className="h-10 w-5 bg-transparent cursor-pointer flex-shrink-0"
                onClick={() =>
                  document
                    .getElementById('scroll-container')
                    ?.scrollBy({ left: 250, behavior: 'smooth' })
                }
              >
                <East />
              </button>
            </div>
          </div>
        </section>
      </Container>

      <section className="w-full bg-[#09C0F0]" id={aboutUsId}>
        <Container className="!p-0">
          <div className="flex flex-col md:flex-row justify-around items-center gap-2 w-full">
            <div className="flex flex-col flex-1 gap-2  p-2">
              <h2 className="text-4xl text-white flex flex-col">
                <span className="font-extralight">About the</span>
                <span className="font-extrabold">Level Hub</span>
              </h2>

              <p className="text-white font-extralight max-w-52">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo non molestias in, iste
                explicabo deserunt quis labore dolorum iure debitis velit, quos, soluta vitae
                obcaecati quae. Illo dignissimos voluptate sapiente earum dicta non laboriosam! Quae
                quam, ullam debitis voluptas rem iusto nostrum incidunt? Praesentium quo similique
                omnis eligendi quam corrupti distinctio harum error necessitatibus rem! Ullam a
                numquam voluptates
              </p>

              <button className="bg-black px-2 py-1 w-15 text-white rounded-lg text-sm flex justify-center items-center">
                Learn More
              </button>
            </div>

            <div className="flex justify-center flex-1 w-full">
              <img
                src="/assets/images/dashboard/about_lh.png"
                alt="About Level Hub"
                className="w-full h-full"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Dashboard;

const roles: IRole[] = [
  {
    title: 'Gym Owner',
    icon: '/assets/images/dashboard/business_teams_icon.png',
    path: route.gym,
  },
  {
    title: 'Coach',
    icon: '/assets/images/dashboard/coaches_icon.png',
    path: route.coach,
  },
  {
    title: 'Single User',
    icon: '/assets/images/dashboard/user_icon.png',
    path: route.individual,
  },
  {
    title: 'Parent',
    icon: '/assets/images/dashboard/user_icon.png',
    path: route.parent,
  },
];

export interface IRole {
  title: string;
  icon: string;
  path: string;
}
