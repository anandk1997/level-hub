import { HelmetTitle } from 'src/components/HelmetTitle';

import { RoleDetails } from 'src/sections/roleDetails';

export default function Coach() {
  return (
    <>
      <HelmetTitle title="Coach Details" />

      <RoleDetails
        icon="/assets/images/role_images/coach_icon.png"
        title="Coach"
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
