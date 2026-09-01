import sys
p1 = 'src/containers/UnenrollConfirmModal/components/ConfirmPane.jsx'
p2 = 'src/containers/UnenrollConfirmModal/components/ReasonPane.jsx'
for p in [p1, p2]:
    c = open(p).read()
    c = c.replace('variant="tertiary" onClick={handleClose}', 'variant="tertiary" className="cancel-btn" onClick={handleClose}')
    open(p, 'w').write(c)