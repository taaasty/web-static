/*global i18n */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import InfoPageFooter from './InfoPageFooter';
import { setBodyLayoutClassName } from '../helpers/htmlHelpers';

class PolicyPage extends Component {
  componentDidMount() {
    setBodyLayoutClassName('layout--info');
  }
  render() {
    const title = i18n.t('policy.title');

    return (
      <div className="page__inner">
        <div className="page__paper">
          <div className="page-body">
            <div className="layout-outer">
              <Helmet title={title} />
              <div className="policy-contents">
                <h1>
                  Privacy Policy
                </h1>
                <p>
                  This Taaasty.com Privacy Policy describes the information we gather from you when you use the Site, mobile applications, and related services (together, the "Tasty") and how we use, process, and disclose that information.
                </p>
                <question>
                  What personal information do we collect from the people that visit Tasty?
                </question>
                <answer>
                  When ordering or registering on Tasty, as appropriate, you may be asked to enter your name, email address, mailing address, phone number or other details to help you with your experience.
                </answer>
                <question>
                  When do we collect information?
                </question>
                <answer>
                  We collect information from you when you register, place an order or enter information.
                </answer>
                <question>
                  How do we use your information?
                </question>
                <answer>
                  We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other features in the following ways:
                  <ul>
                    <li>
                      To personalize your experience and to allow us to deliver the type of content and product offerings in which you are most interested.
                    </li>
                    <li>
                      To improve Tasty in order to better serve you.
                    </li>
                    <li>
                      To allow us to better service you in responding to your customer service requests.
                    </li>
                    <li>
                      To quickly process your transactions.
                    </li>
                    <li>
                      To send periodic emails regarding your order or other products and services.
                    </li>
                  </ul>
                </answer>
                <question>
                  Do we use 'cookies'?
                </question>
                <answer>
                  <p>
                    Yes. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your Web browser (if you allow) that enables the site's or service provider's systems to recognize your browser and capture and remember certain information. For instance, we use cookies to help us remember and process the items in your shopping cart. They are also used to help us understand your preferences based on previous or current site activity, which enables us to provide you with improved services. We also use cookies to help us compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.
                  </p>
                  <h3>We use cookies to:</h3>
                  <ul>
                    <li>
                      Understand and save user's preferences for future visits.
                    </li>
                    <li>
                      Compile aggregate data about site traffic and site interactions in order to offer better site experiences and tools in the future. We may also use trusted third-party services that track this information on our behalf.
                    </li>
                  </ul>
                  <p>
                    You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser settings. Since browser is a little different, look at your browser's Help Menu to learn the correct way to modify your cookies.
                  </p>
                </answer>
                <question>
                  If users disable cookies in their browser:
                </question>
                <answer>
                  If you turn cookies off, some features will be disabled. Some of the features that make your site experience more efficient and may not function properly.
                </answer>
                <question>
                  Third-party disclosure
                </question>
                <answer>
                  <p>
                    We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential. We may also release information when it's release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property or safety.
                  </p>
                  <p>
                    However, non-personally identifiable visitor information may be provided to other parties for marketing, advertising, or other uses.
                  </p>
                </answer>
                <question>
                  Third-party links
                </question>
                <answer>
                  Occasionally, at our discretion, we may include or offer third-party products or services on Tasty. These third-party services have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these services.
                </answer>
                <question>
                  Contacting Us
                </question>
                <answer>
                  <p>
                    If there are any questions regarding this privacy policy, you may contact us using the information below.
                  </p>

                  <contacts>
                    <site>
                      taaasty.com
                    </site>
                    <email>
                      <a href="mailto:support@taaasty.ru">support@taaasty.ru</a>
                    </email>
                  </contacts>

                  <edited>
                    Last Edited on 2016-06-28
                  </edited>
                </answer>
                <InfoPageFooter />
              </div>
            </div>
          </div>
        </div>
      </div>  
    );
  }
}

PolicyPage.displayName = 'PolicyPage';

export default PolicyPage;
