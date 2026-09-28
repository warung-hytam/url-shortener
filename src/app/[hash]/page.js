import LinkExpired from '@/components/LinkExpired';
import LinkNotFound from '@/components/LinkNotFound';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function RedirectPage(props) {
  const params = await props.params;
  const { hash } = params;

  const record = await prisma.urlInfo.findUnique({
    where: { uid: hash },
  });

  if (!record) {
    return <LinkNotFound />;
  }

  if (record.expiredAt && new Date(record.expiredAt) < new Date()) {
    await prisma.urlInfo.delete({
      where: { uid: hash },
    });
    return <LinkExpired />;
  }

  if (record.url) {
    redirect(record.url);
  }
}
