import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { RoleDetails } from 'src/sections/roleDetails';

export default function SingleUser() {
  return (
    <>
      <Helmet>
        <title> {`Single User Details - ${CONFIG.appName}`}</title>
      </Helmet>

      <RoleDetails
        icon="/assets/images/role_images/single_user_icon.png"
        title="Single User"
        description={`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo non molestias in, iste
            explicabo deserunt quis labore dolorum iure debitis velit, quos, soluta vitae obcaecati
            quae. Illo dignissimos voluptate sapiente earum dicta non laboriosam! Quae quam, ullam
            debitis voluptas rem iusto nostrum incidunt? Praesentium quo similique omnis eligendi
            quam corrupti distinctio harum error necessitatibus rem! Ullam a numquam voluptates
            placeat ut aliquid nulla dicta adipisci sit. Dolorum numquam qui harum doloribus
            repellendus blanditiis veritatis, est voluptatem sunt sint praesentium adipisci maiores
            iusto, ex molestiae illum quas error incidunt? Repellendus asperiores nulla, totam
            soluta eius saepe ad quia ratione nisi voluptatum?`}
      />
    </>
  );
}
