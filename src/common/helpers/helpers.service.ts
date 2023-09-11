import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { config } from '../../config/config.constant';

import {
  digits,
  lower,
  randomPassword,
  symbols,
  upper,
} from 'secure-random-password';
import { InputDataDTO } from '../../data-situations/interfaces/InputDataDTO.interface';
import { FormattedDataDTO } from '../../data-situations/interfaces/FormattedDataDTO.interface';

@Injectable()
export class HelpersService {
  async getRandomPassword() {
    return randomPassword({
      length: 8,
      characters: [
        {
          characters: upper,
          exactly: 3,
        },
        {
          characters: symbols,
          exactly: 2,
        },
        {
          characters: digits,
          exactly: 2,
        },
        {
          characters: lower,
        },
      ],
    });
  }
  async getHashPassword(password: string) {
    const saltRounds = 10;
    return await hash(password, saltRounds).then((hash) => {
      return hash;
    });
  }

  formatUserToSendMail(user: any, token: string) {
    return {
      first_name: user.first_name,
      last_name: user.last_name,
      civilite: '',
      user_email: user.email,
      password: '',
      link_connect: config.front + token,
      subject: 'Test Mail',
      copy_conform: [],
      hide_copy: [],
      body_message: 'Just un test de mail',
    };
  }

  async comparePassword(password: string, userPassword: string) {
    return await compare(password, userPassword).then(
      async (valid: boolean) => {
        return valid;
      },
    );
  }

  extractProductCode(chaine: string): string | null {
    const parts = chaine.split('.');
    if (parts.length > 0) {
      return parts[0] + '.';
    } else {
      return null;
    }
  }

  formatDataSituations(taux: any, inputData: InputDataDTO): FormattedDataDTO {
    return {
      exercice: inputData.Exercice,
      police: inputData.Police,
      typeCompte: inputData.Typecompte,
      soldePrec: inputData.SoldePrec,
      pbPrec: inputData.PBPrec,
      cotiExo: inputData.CotiExo,
      rachExo: inputData.RachExo,
      soldeExo: inputData.SoldeExo,
      pbExo: inputData.PBExo,
      intg: inputData.Intg,
      tauxId: taux.id,
      corporateId: taux.corporateId,
      approuveProductsId: taux.approuveProductsId,
    };
  }

  async verifyPasswordPolicies(password: string) {
    const errors = [];
    const ruleOne = this.isLengthCorrect(password);
    const ruleThree = this.isContainNumbers(password);
    const ruleFour = this.isContainUpperCaseLetter(password);
    if (!ruleOne.isCorrect) {
      errors.push(ruleOne.message);
    }
    if (!ruleThree.isCorrect) {
      errors.push(ruleThree.message);
    }
    if (!ruleFour.isCorrect) {
      errors.push(ruleFour.message);
    }
    return errors;
  }

  isLengthCorrect(password: string) {
    let isCorrect = true;
    let error = '';
    if (password.length < 6) {
      isCorrect = false;
      error = 'Votre mot de passe doit contenir au moins 6 caractères';
    }
    return { isCorrect: isCorrect, message: error };
  }

  isContainSpecialChars(password: string) {
    let isCorrect = true;
    let error = '';
    let specialChars = 0;
    for (const word of password) {
      if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gm.test(word)) {
        ++specialChars;
      }
    }
    if (specialChars < 2) {
      isCorrect = false;
      error = 'Votre mot de passe doit contenir au moins 2 caractères spéciaux';
    }
    return { isCorrect: isCorrect, message: error };
  }

  isContainNumbers(password: string) {
    let isCorrect = true;
    let error = '';
    if (!/[0-9]{1}/gm.test(password)) {
      isCorrect = false;
      error = 'Votre mot de passe doit contenir au moins un chiffre';
    }
    return { isCorrect: isCorrect, message: error };
  }

  isContainUpperCaseLetter(password: string) {
    let isCorrect = true;
    let error = '';
    if (!/[A-Z]{1}/gm.test(password)) {
      isCorrect = false;
      error = 'Votre mot de passe doit contenir au moins une lettre majuscule';
    }
    return { isCorrect: isCorrect, message: error };
  }

  isContainLowerCaseLetter(password: string) {
    let isCorrect = true;
    let error = '';
    if (!/[a-z]{2}/gm.test(password)) {
      isCorrect = false;
      error =
        'Votre mot de passe doit contenir au moins deux lettres minuscules';
    }
    return { isCorrect: isCorrect, message: error };
  }
}
