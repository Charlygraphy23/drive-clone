import { authOptions } from "@/app/lib/authConfig"
import { getServerSession, User } from "next-auth"
import GettingStartedHeader from "../getting-started/components/header"
import style from "./style.module.scss"

const Index = async () => {

  const session = await getServerSession(authOptions);
  const user = session?.user as User

  return (
    <main className={style?.tc}>
      <GettingStartedHeader user={user} />

      <section>
        <h1>Terms of Service</h1>

        <p>This website is operated by MBOX. Throughout the site, the terms “we”, “us” and “our” refer to MBOX. MBOX offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.</p>

        <p>By visiting our site and/or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.</p>

        <p>Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.</p>

        <p>Any new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.</p>

        <h2>SECTION 1 - ONLINE STORE TERMS</h2>

        <p>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.</p>

        <p>You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).</p>

        <p>You must not transmit any worms or viruses or any code of a destructive nature.</p>

        <p>A breach or violation of any of the Terms will result in an immediate termination of your Services.</p>

        <h2>SECTION 2 - GENERAL CONDITIONS</h2>

        <p>We reserve the right to refuse service to anyone for any reason at any time.</p>

        <p>You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.</p>

        <p>You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.</p>

        <p>The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.</p>

        <h2>SECTION 3 - ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION</h2>

        <p>We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk.</p>

        <p>This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site.</p>

        <h2>SECTION 4 - MODIFICATIONS TO THE SERVICE AND PRICES</h2>

        <p>Prices for our products are subject to change without notice.</p>

        <p>We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.</p>

        <p>We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.</p>

        <h2>SECTION 5 - PRODUCTS OR SERVICES</h2>

        <p>Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.</p>

        <p>We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.</p>

        <p>We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region or jurisdiction. We may exercise this right on a case-by-case basis. We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products or product pricing are subject to change at any time without notice, at the sole discretion of us. We reserve the right to discontinue any product at any time. Any offer for any product or service made on this site is void where prohibited.</p>

        <p>We do not warrant that the quality of any products, services, information, or other material purchased or obtained by you will meet your expectations, or that any errors in the Service will be corrected.</p>

        <h2>SECTION 6 - ACCURACY OF BILLING AND ACCOUNT INFORMATION</h2>

        <p>We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers or distributors.</p>

        <p>You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.</p>

        <p>For more detail, please review our Returns Policy.</p>

        <h2>SECTION 7 - OPTIONAL TOOLS</h2>

        <p>We may provide you with access to third-party tools over which we neither monitor nor have any control nor input.</p>

        <p>You acknowledge and agree that we provide access to such tools “as is” and “as available” without any warranties, representations or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools.</p>

        <p>Any use by you of optional tools offered through the site is entirely at your own risk and discretion and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s).</p>

        <p>We may also, in the future, offer new services and/or features through the website (including, the release of new tools and resources). Such new features and/or services shall also be subject to these Terms of Service.</p>

        <h2>SECTION 8 - THIRD-PARTY LINKS</h2>

        <p>Certain content, products and services available via our Service may include materials from third-parties.</p>

        <p>Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or services of third-parties.</p>

        <p>We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third-party's policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns</p>
      </section>
    </main>
  )
}

export default Index