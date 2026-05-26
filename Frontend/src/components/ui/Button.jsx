import { Link } from "react-router-dom";

const variants = {
  primary: "btn-primary",
  "primary-dark": "btn-primary-on-dark",
  ghost: "btn-ghost",
  "ghost-dark": "btn-ghost-on-dark",
};

function Button({
  variant = "primary",
  href,
  to,
  download,
  className = "",
  children,
  ...props
}) {
  const classes = `${variants[variant] ?? variants.primary} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      download={download}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  );
}

export default Button;
