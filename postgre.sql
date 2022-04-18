-- Create table products 
-- with reference to table categories

CREATE TABLE public.products (
	id CHARACTER VARYING(55) NOT NULL,
	"categoryId" CHARACTER VARYING(55) NOT NULL,
	FOREIGN KEY ("categoryId") REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE SET NULL,
	PRIMARY KEY(id, "categoryId")
);

-- - MANY-TO-MANY RELATIONSHIP FOR <[ROLE] - [PERMISSION]>

CREATE TABLE public.roles (
	id CHARACTER VARYING(55) NOT NULL UNIQUE
);

-- Create table permissions
CREATE TABLE public.permissions (
	id CHARACTER VARYING(55) NOT NULL,
	"roleId" CHARACTER VARYING(55) NOT NULL,
	FOREIGN KEY ("roleId") REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE SET NULL,
	PRIMARY KEY(id, "roleId")
);

-- Create a join table roles_permissions
-- იგივე bridge table. შეგვიძლია დავქვეროთ ყველა permission, რომელიც 1 როლს უკავშირდება და vice versa

CREATE TABLE public.roles_permissions (
	"roleId" CHARACTER VARYING(55) NOT NULL,
	permission_id CHARACTER VARYING(55) NOT NULL,
	PRIMARY KEY ("roleId", permission_id),
	FOREIGN KEY ("roleId") REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE SET NULL,
	FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON UPDATE CASCADE ON DELETE SET NULL
);

