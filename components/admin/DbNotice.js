'use client';

import Icon from '../Icons';
import { useLang } from '../LanguageProvider';

/** Error codes jinke liye humare paas apni line hai */
const ERROR_KEY = {
  FORBIDDEN: 'ownerOnly',
  UNAUTHORIZED: 'wrongLogin',
  NETWORK: 'somethingWrong'
};

/** Jab MongoDB abhi juda na ho — saaf saaf batata hai kya karna hai */
export default function DbNotice({ error }) {
  const { t } = useLang();

  if (!error) return null;

  if (error === 'DB_NOT_CONNECTED') {
    return (
      <div className="card border-amber-200 bg-amber-50 p-6">
        <div className="flex items-start gap-3">
          <Icon name="shield" className="mt-0.5 h-6 w-6 shrink-0 text-amber-600" />
          <div>
            <h3 className="font-semibold text-amber-900">{t('dbNotConnectedTitle')}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-amber-800">{t('dbNotConnectedIntro')}</p>
            <ol className="mt-3 space-y-1.5 text-sm text-amber-900">
              <li>1. {t('dbStep1')}</li>
              <li>2. {t('dbStep2')}</li>
              <li>3. {t('dbStep3')}</li>
              <li>4. {t('dbStep4')}</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card border-red-200 bg-red-50 p-5 text-sm text-red-800">
      {ERROR_KEY[error] ? t(ERROR_KEY[error]) : `${t('somethingWrong')}: ${error}`}
    </div>
  );
}
