import { FileText, History, Users, Mail, FileEdit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  title: string;
  href: string;
  icon: JSX.Element;
}

interface NavConfig {
  [key: string]: NavItem[];
}

const navConfig: NavConfig = {
  '/emails/dashboard': [
    {
      title: 'Dashboard',
      href: '/emails/dashboard',
      icon: <FileText className="w-4 h-4" />
    }
  ],
  '/emails/sacados': [
    {
      title: 'Sacados',
      href: '/emails/sacados',
      icon: <Users className="w-4 h-4" />
    }
  ],
  '/emails/template': [
    {
      title: 'Template de E-mail',
      href: '/emails/template',
      icon: <FileEdit className="w-4 h-4" />
    }
  ],
  '/emails/enviar': [
    {
      title: 'Envio de E-mails',
      href: '/emails/enviar',
      icon: <Mail className="w-4 h-4" />
    },
    {
      title: 'Histórico de E-mails',
      href: '/emails/historico',
      icon: <History className="w-4 h-4" />
    }
  ],
  '/emails/historico': [
    {
      title: 'Envio de E-mails',
      href: '/emails/enviar',
      icon: <Mail className="w-4 h-4" />
    },
    {
      title: 'Histórico de E-mails',
      href: '/emails/historico',
      icon: <History className="w-4 h-4" />
    }
  ],
  '/numero-extenso': [
    {
      title: 'Número por Extenso',
      href: '/numero-extenso',
      icon: <FileText className="w-4 h-4" />
    }
  ]
};

// Rest of the file remains the same...