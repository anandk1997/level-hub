import { HelmetTitle } from 'src/components/HelmetTitle';
import { BlogView } from 'src/sections/blog/view';

export default function Page() {
  return (
    <>
      <HelmetTitle title="Blog" />

      <BlogView />
    </>
  );
}
