import { HelmetTitle } from 'src/components/HelmetTitle';

import { ProductsView } from 'src/sections/product/view';

export default function Page() {
  return (
    <>
      <HelmetTitle title="Products" />

      <ProductsView />
    </>
  );
}
