import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DesplegableUser, NoDesplegableUser, useAuthStore, UserAuth} from "../../index";
import { v } from '../../styles/Variables';

export function AccountMenu() {
  const navigate = useNavigate();
  const { user } = UserAuth();
  const signOut = useAuthStore((state) => state.signOut);
  const updateProfilePicture = useAuthStore((state) => state.updateProfilePicture);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const displayName = user?.name || user?.full_name || 'Usuario';
  const email = user?.email || '';
  const initial = displayName.trim()[0]?.toUpperCase() || '?';

  const closeAll = () => {
    setOpen(false);
    setExpanded(false);
  };

  const handlePickPhoto = (e) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handlePhotoSelected = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    //Crear una URL local para renderizar la imagen
    const objectURL = URL.createObjectURL(file);
    setPreview(objectURL);

    try {
      await updateProfilePicture(file);
    } catch (error) {
      console.error(error);
      setPreview(null);
    }
  }

  const toggleExpand = (e) => {
    e.stopPropagation();
    setExpanded((prev) => !prev);
  }

  const handleItemClick = (tipo) => {
    closeAll();

    if (tipo === 'miperfil') {
      navigate('/perfil');
    } else if (tipo === 'agregarcuenta') {
      navigate('/register');
    } else if (tipo === 'salir') {
      signOut();
    } else if (tipo === 'configuracion') {
      navigate('/configuracion');
    }
  }

  return (
    <Wrapper>
      <AvatarButton type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Cuenta">
        {preview || user?.picture ? <img src={preview || user.picture} 
          alt={displayName}/> : initial}
      </AvatarButton>
      {open && (
        <>
          <Overlay onClick={closeAll}/>
          <Panel>
            <HeaderActions>
              <CloseButton type="button"
                onClick={closeAll}
                aria-label="Cerrar">
                <v.iconoX size={20}/>
              </CloseButton>
            </HeaderActions>
            <ProfileRow $expanded={expanded}>
              <AvatarSide $expanded={expanded}>
                <BigAvatarWrap>
                  <BigAvatar>
                    {preview || user?.picture ? <img src={preview || user.picture}
                      alt={displayName}/> : initial}
                  </BigAvatar>
                  <EditPhotoButton type="button"
                    onClick={handlePickPhoto}
                    aria-label="Cambiar foto de perfil">
                    <v.iconoPencil size={17}/>
                  </EditPhotoButton>
                  <HiddenFileInput ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoSelected}/>
                </BigAvatarWrap>
              </AvatarSide>
              <InfoSide $expanded={expanded}
                onClick={toggleExpand}>
                <TextContainer>
                  <UserName>{displayName}</UserName>
                  <UserEmail>{email}</UserEmail>
                </TextContainer>
                <ChevronCircle $expanded={expanded} aria-label="Desplegar Opciones">
                  <v.iconoChevronDown size={18}/>
                </ChevronCircle>
              </InfoSide>
            </ProfileRow>
            {expanded && (
              <ExpandedMenuContainer>
                {DesplegableUser.map((item, index) => {
                  const Icono = item.icono;
                  return (
                    <MenuItem key={item.tipo || index}
                      onClick={() => handleItemClick(item.tipo)}>
                      {Icono && (
                        <IconoWrapper>
                          <Icono size={18}/>
                        </IconoWrapper>
                      )}
                      <ItemText>{item.text}</ItemText>
                    </MenuItem>
                  );
                })}
              </ExpandedMenuContainer>
            )}
            <StandAloneContainer>
              {NoDesplegableUser.map((item, index) => {
                const Icono = item.icono;
                return (
                  <StandAloneMenuItem key={item.tipo || index}
                    onClick={() => handleItemClick(item.tipo)}>
                    {Icono && (
                      <IconoWrapper>
                        <Icono size={18}/>
                      </IconoWrapper>
                    )}
                    <ItemText>{item.text}</ItemText>
                  </StandAloneMenuItem>
                );
              })}
            </StandAloneContainer>
          </Panel>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

const AvatarButton = styled.button`
  appearance: none;
  -webkit-appearance: none;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  outline: none;
  padding: 4px;
  background: ${({ $isOpen, theme }) => 
    $isOpen
      ? (theme.bgAvatarActive || '#444746')
      : (theme.bgAvatar || '#2D2F31')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: background-color 0.2s ease-in-out;
  user-select: none;
  &:hover {
    background: ${({ theme }) => theme.bgAvatarActive || '#444746'};
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    display: block;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 30;
`;

const Panel = styled.div`
  position: absolute;
  top: calc(100% + 0.6rem);
  right: 0;
  width: 350px;
  background: ${({ theme }) => theme.bg3 || '#18181A'};
  border: 1px solid ${({ theme }) => theme.border || '#333'};
  border-radius: 20px;
  box-shadow: ${v.boxshadowGray};
  z-index: 31;
  overflow: hidden;
  padding: 8px;
`;

const HeaderActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 6px;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.textMuted || '#A1A1AA'};
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: ${({ theme }) => theme.bg4 || '#2F3033'};
    color: ${({ theme }) => theme.text || '#FFFFFF'};
  }
`;

const ProfileRow = styled.div`
  display: flex;
  background: ${({ theme }) => theme.bg5 || '#21252B'};
  overflow: hidden;
  border-radius: ${({ $expanded }) =>
    $expanded ? '16px 16px 0 0' : '16px'
  };
`;

const AvatarSide = styled.div`
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.bg5 || '#28292C'};
  border-top-left-radius: 16px;
  border-bottom-left-radius: ${({ $expanded }) => 
    $expanded ? '0' : '16px'
  };
  &:hover {
    background: ${({ theme }) => theme.bg4};
  }
`;

const BigAvatarWrap = styled.div`
  position: relative;
  width: 52px;
  height: 52px;
  flex-shrink: 0;
`;

const BigAvatar = styled.div`
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: ${({ theme }) => theme.bg4 || '#444746'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text || '#FFF'};
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const EditPhotoButton = styled.button`
  position: absolute;
  bottom: -1px;
  right: -1px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1.5px solid ${({ theme }) => theme.body || '#202020'};
  background: ${({ theme }) => theme.surfaceAlt || '#2f3033'};
  color: ${({ theme }) => theme.text || '#ffffff'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s ease, background-color 0.2s ease;
  &:hover {
    color: ${({ theme }) => theme.badgeText};
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const InfoSide = styled.div`
  flex: 1;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: background 0.2s ease;
  border-top-right-radius: 16px;
  border-bottom-right-radius: ${({ $expanded }) =>
    $expanded ? '0' : '16px'
  };
  &:hover {
    background: ${({ theme }) => theme.bg4};
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: hidden;
`;

const UserName = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text || '#FFFFFF'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserEmail = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textMuted || '#8AB4F8'};
`;

const ChevronCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 75%;
  background: rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text || '#FFFFFF'};
  flex-shrink: 0;
  margin-left: 8px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ $expanded }) => (
    $expanded ? 'rotate(-180deg)' : 'rotate(0deg)'
  )};
`;

const ExpandedMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 4px;
  background: transparent;
  padding: 0;
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 14px 16px;
  border: none;
  background: ${({ theme }) => theme.bg5 || '#18181A'};
  color: ${({ theme }) => theme.text || '#ffffff'};
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease, opacity 0.2s ease;
  &:last-of-type {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  &:hover {
    background: ${({ theme }) => theme.bg4 || '#28292C'};
  }
`;

const IconoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  color: ${({ theme }) => theme.text || '#ffffff'};
  flex-shrink: 0;
  ${MenuItem}:hover & {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const ItemText = styled.span`
  flex: 1;
  text-align: left;
  font-size: 0.95rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text || '#ffffff'};
`;

const StandAloneContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 6px;
  background: transparent;
`;

const StandAloneMenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 10px 12px;
  border: none;
  border-radius: 25px;
  background: ${({ theme }) => theme.bg5 || '#18181A'};
  color: ${({ theme }) => theme.text || '#ffffff'};
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background: ${({ theme }) => theme.bg4 || '#28292C'};
  }
`;