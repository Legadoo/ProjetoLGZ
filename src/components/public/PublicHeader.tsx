import { getCurrentAdminUser, getCurrentCustomer } from "@/lib/session";
import { getSiteConfig } from "@/services/site.service";
import { PublicHeaderClient } from "./PublicHeaderClient";

export async function PublicHeader() {
  const [customer, admin, config] = await Promise.all([
    getCurrentCustomer(),
    getCurrentAdminUser(),
    getSiteConfig(),
  ]);

  return (
    <PublicHeaderClient
      customerName={customer?.name || null}
      adminName={admin?.name || null}
      brandName={config.brandName}
      logoUrl={config.logoUrl}
    />
  );
}