import { Avatar, Typography } from '@mui/material';

import { Badge } from '@mui/material';
import { cn } from 'src/utils';
import { ILevel } from '..';
import { BorderLinearProgress, SmallAvatar } from './Styled';
import { useAppSelector } from 'src/store/redux';

export const XpProgress = ({ level }: { level: ILevel }) => {
  const { fullName } = useAppSelector((state) => state.auth);

  return (
    <div className="bg-[#4884b6] rounded-2xl p-1.5 sm:p-3 flex flex-col sm:flex-row items-center gap-3">
      <div className="">
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <SmallAvatar src="/static/images/avatar/1.jpg" sx={{ width: 24, height: 24 }} />
          }
        >
          <Avatar
            src={'/assets/images/target_xp.png'}
            // onError={() => setImageError(true)}
            className={cn(
              '!bg-[#FF991F] !border-4 !text-5xl font-bold !border-white !h-14 !w-12 md:!h-20 md:!w-18',
              { '!p-3': !false }
            )}
          >
            {fullName
              ?.split(' ')
              ?.map((w) => w?.[0]?.toUpperCase())
              ?.join('')}
          </Avatar>
        </Badge>

        {/* <div className="bg-[#FF991F] border-4 border-white h-22 w-18 rounded-[60%/60%] flex justify-center items-center text-white text-5xl font-bold">
        {fullName
          .split(' ')
          .map((w) => w[0].toUpperCase())
          .join('')}
      </div> */}
      </div>

      <div className="w-[70%] sm:w-[55%] flex flex-col gap-1.5 text-white">
        <Typography className="flex !text-xl !ms-1">Target Level XP</Typography>
        <Typography className="flex !text-5xl !font-extrabold !ms-1" component={'h1'}>
          {level.levelXP}
        </Typography>
        <BorderLinearProgress variant="determinate" value={level.currentXP} />
        <Typography className="flex !ms-1">{level.levelXP - level.currentXP}XP to go</Typography>
      </div>
    </div>
  );
};
